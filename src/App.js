import { useState, useEffect } from 'react'
import {
  GlobalStyle,
  ThemeProvider,
  Paragraph,
  Link,
  Select,
  Button,
  themeSpacing,
  Spinner,
  ErrorMessage,
} from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'
import styled from 'styled-components'
import useDownload from './useDownload'

const urlFragment =
  'https://api.data.amsterdam.nl/v1/verkiezingen/processenverbaal/?verkiezingsjaar=2023&page_size=10000&documentnaam[like]='

const zeroPad = (num, places) => String(num).padStart(places, '0')

const StyledForm = styled.form`
  width: 100%;
  margin-top: ${themeSpacing(8)};
`

const StyledSelect = styled(Select)`
  max-width: 320px;
  margin-bottom: ${themeSpacing(9)};
`

const SpinnerWrapper = styled.div`
  max-width: 320px;
`

function App() {
  const [data, setData] = useState()
  const [config, setConfig] = useState()
  const [district, setDistrict] = useState('_c')
  const [value, setValue] = useState('placeholder')
  const [downloadLoading, downloadFile, error] = useDownload()
  const [resetError, setResetError] = useState(false)
  const [disableButton, setDisableButton] = useState(true)

  useEffect(() => {
    let isMounted = true

    setData(null)

    fetch(`${urlFragment}*${district}`)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) {
          setData(json)
        }
      })

    return () => {
      isMounted = false
    }
  }, [district])

  useEffect(() => {
    let isMounted = true

    const rootDiv = document.querySelector('#root')
    const config = rootDiv?.dataset?.config
    const configUrl = config && JSON.parse(config)?.contentApi

    fetch(configUrl)
      .then((response) => response.json())
      .then((json) => {
        if (isMounted) {
          setConfig(json)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value)
    setValue('placeholder')
    setDisableButton(true)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    setResetError(true)
    setDisableButton(false)
  }

  const handleClick = () => {
    downloadFile(value)
    setResetError(false)
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Paragraph>
        Hier kunt u de processen-verbaal van de Amsterdamse stembureaus
        downloaden.
      </Paragraph>
      <Paragraph>
        {config && (
          <Link
            href={`${config?.applicatie['extra-velden']?.variabelen?.value}overzicht-stembureaus-tk-2023.pdf`}
            variant="inline"
            target="_blank"
          >
            Bekijk hier de lijst met alle stembureaus
          </Link>
        )}
      </Paragraph>
      <StyledForm>
        <StyledSelect
          value={district}
          onChange={handleDistrictChange}
          label={'Kies stadsdeel'}
        >
          <option value="_c">Centrum</option>
          <option value="_nw">Nieuw-West</option>
          <option value="_n">Noord</option>
          <option value="_o">Oost</option>
          <option value="_w">West</option>
          <option value="_z">Zuid</option>
          <option value="_zo">Zuidoost</option>
          <option value="_w">Weesp</option>
          <option value="">Alle</option>
        </StyledSelect>
        {data ? (
          <>
            <StyledSelect
              value={value}
              onChange={handleChange}
              label={'Kies stembureau'}
            >
              <option value="placeholder" disabled hidden>
                Maak een keuze
              </option>
              {data._embedded?.processenverbaal
                ?.sort((a, b) => a.volgnummer - b.volgnummer)
                .map(({ id, volgnummer, uri }) => (
                  <option key={id} value={uri}>
                    {`Stembureau ${zeroPad(volgnummer, 3)}`}
                  </option>
                ))}
            </StyledSelect>
            <Button
              type="button"
              iconLeft={downloadLoading ? <Spinner /> : <Download />}
              onClick={handleClick}
              variant="primary"
              disabled={disableButton || downloadLoading}
            >
              Download
            </Button>
            {error && !resetError && (
              <ErrorMessage message="Deze download is niet beschikbaar" />
            )}
          </>
        ) : (
          <SpinnerWrapper>
            <Spinner size={24} />
          </SpinnerWrapper>
        )}
      </StyledForm>
    </ThemeProvider>
  )
}

export default App
