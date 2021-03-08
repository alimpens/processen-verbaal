import { useState, useEffect } from 'react'
import {
  GlobalStyle,
  ThemeProvider,
  Row,
  Column,
  Heading,
  Paragraph,
  Link,
  Select,
  Button,
  themeSpacing,
  Spinner,
} from '@amsterdam/asc-ui'
import { Download } from '@amsterdam/asc-assets'
import styled from 'styled-components'
import useDownload from './useDownload'

const URL = 'https://api.data.amsterdam.nl/v1/verkiezingen/processenverbaal/?page_size=10000&verkiezingsjaar=2021'

const zeroPad = (num, places) => String(num).padStart(places, '0')

const StyledColumn = styled(Column)`
  flex-direction: column;
`

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
  const [downloadLoading, downloadFile] = useDownload()

  useEffect(() => {
    let isMounted = true;

    fetch(URL)
      .then(response => response.json())
      .then(json => {
        if (isMounted) {
          setData(json)
        }
      });

    return () => { isMounted = false; }
  }, [])

  console.log(data)

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Row>
        <StyledColumn
          wrap
          span={{ small: 1, medium: 2, big: 4, large: 7, xLarge: 7 }}
          push={{ small: 0, medium: 0, big: 1, large: 1, xLarge: 1 }}
        >
          <Heading gutterBottom={28}>Processen-verbaal stemlocaties Tweede Kamerverkiezingen 2021</Heading>
          <Paragraph>Na de Tweede Kamerverkiezingen in maart 2021 is er door ieder stemlokaal in de stad Amsterdam een proces verbaal opgemaakt.</Paragraph>
          <Paragraph>Hier kunt u het proces verbaal van alle stemlocaties in Amsterdam vinden.</Paragraph>
          <Paragraph>
            <Link href='#' variant='inline'>Bekijk hier de lijst met alle stemlokalen</Link>
          </Paragraph>
          {data ?
          <StyledForm>
            <StyledSelect>
              {data._embedded?.processenverbaal?.map(({ id, volgnummer, stemlocatie }) =>
                <option key={id}>{`Stemlokaal ${zeroPad(volgnummer, 3)} (${stemlocatie})`}</option>
              )}
            </StyledSelect>
            <Button
              type='button'
              iconLeft={downloadLoading ? <Spinner /> : <Download />}
              onClick={() => downloadFile("https://0855010431b44f9caec7803bce29def8.objectstore.eu/processenverbaal/2021/001.procesverbaaltk21.Amstel1.pdf")}
              variant='primary'
            >
              Download
            </Button>
          </StyledForm> :
          <SpinnerWrapper>
            <Spinner size={24} />
          </SpinnerWrapper>}
        </StyledColumn>
      </Row>
    </ThemeProvider>
  );
}

export default App;