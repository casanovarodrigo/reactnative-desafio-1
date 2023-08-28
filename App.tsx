import { StatusBar } from 'expo-status-bar';
import { Container, FieldGroup, FieldText, FieldTextInput, LoadingOverlay, LoadingText, PageTitle } from './App.styles'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [zipCode, setZipCode] = useState<string>()
  const [streetAdd, setStreetAdd] = useState<string>('')
  const [addressNumber, setAddressNumber] = useState<string>()
  const [complement, setComplement] = useState<string>()
  const [state, setState] = useState<string>()
  const [city, setCity] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (zipCode && zipCode.length == 9)
      getZipCode(zipCode)
  }, [zipCode])


  const getZipCode = async(code: string): Promise<void> => {
    try {
      setIsLoading(true)
      const strippedCode = code.replace('-', '').trim()
      const { data } = await axios.get(`https://viacep.com.br/ws/${strippedCode}/json/`)

      if (!data.erro){
        setStreetAdd(data.logradouro)
        setDistrict(data.bairro)
        setDistrict(data.bairro)
        setCity(data.localidade)
        setState(data.uf)

        if (data.complemento.length > 0){
          setComplement(data.complemento)
        }
      } else {
        setStreetAdd('')
        setDistrict('')
        setDistrict('')
        setCity('')
        setState('')
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  const setMaskedZipcode = (code: string): void => {
    const masked = code.replace(/(\d{5})(\d{3})/, '$1-$2')
    setZipCode(masked)
  }

  return <Container>
      <StatusBar backgroundColor="#aaff1e" translucent />
      <PageTitle>Cadastre seu endereço</PageTitle>

      {isLoading && (<LoadingOverlay>
          <LoadingText>Carregando...</LoadingText>
        </LoadingOverlay>)
      }

      <FieldGroup>
        <FieldText>CEP:</FieldText>
        <FieldTextInput value={zipCode} onChangeText={setMaskedZipcode} maxLength={9} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Rua:</FieldText>
        <FieldTextInput value={streetAdd} onChangeText={setStreetAdd} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Número:</FieldText>
        <FieldTextInput value={addressNumber} onChangeText={setAddressNumber} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Complemento:</FieldText>
        <FieldTextInput value={complement} onChangeText={setComplement} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Estado:</FieldText>
        <FieldTextInput value={state} onChangeText={setState} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Cidade:</FieldText>
        <FieldTextInput value={city} onChangeText={setCity} />
      </FieldGroup>
      <FieldGroup>
        <FieldText>Bairro:</FieldText>
        <FieldTextInput value={district} onChangeText={setDistrict} />
      </FieldGroup>
    </Container>
  ;
}