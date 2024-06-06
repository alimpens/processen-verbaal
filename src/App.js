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

// pv_referendum_hoofdgroenstructuur of pv_europees_parlement_2024

const urlFragment =
  'https://api.data.amsterdam.nl/v1/verkiezingen/processenverbaal/?verkiezingsjaar=2024&page_size=10000&documentnaam[like]=*pv_referendum_hoofdgroenstructuur'

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
  const [district, setDistrict] = useState('.c.')
  const [value, setValue] = useState('placeholder')
  const [downloadLoading, downloadFile, error] = useDownload()
  const [resetError, setResetError] = useState(false)
  const [disableButton, setDisableButton] = useState(true)

  useEffect(() => {
    let isMounted = true

    setData(null)

    fetch(`${urlFragment}*${district}*`)
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
    downloadFile(value, {
      headers: {
        'X-Api-Key':
          'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4NzgwODEzOTc4MjQwNDY0MDgsImV4cCI6MTc0NDcxNTc2MH0.YMne5bnppPc6ncLOzhGZIGNmHnc0QEuJC9zyXTZoXwsnVVfbBGOxi7yTv-HDKUSlsmw9C_xSU6AFPt41AcSSDw',
      },
    })
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
            href={`${config?.applicatie['extra-velden']?.variabelen?.value}overzicht-stembureaus-ep-ref-2024.pdf`}
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
          <option value=".c.">Centrum</option>
          <option value=".nw.">Nieuw-West</option>
          <option value=".n.">Noord</option>
          <option value=".o.">Oost</option>
          <option value=".w.">West</option>
          <option value=".z.">Zuid</option>
          <option value=".zo.">Zuidoost</option>
          <option value=".weesp.">Weesp</option>
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
