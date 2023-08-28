import styled from 'styled-components/native'

export const Container = styled.View`
  padding: 40px 32px;
`
export const PageTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin: 12px 0 16px 0;
`
export const FieldGroup = styled.View`
  padding: 0;
  margin-top: 4px;
  margin-bottom: 8px;
`
export const FieldText = styled.Text`
  color: #172B4D;
  margin-bottom: 4px;
`
export const FieldTextInput = styled.TextInput`
  color: #172B4D;
  border: 1px #172B4D solid;
  border-radius: 4px;
  padding: 4px 8px;
`
export const LoadingOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, .4);
  align-items: center;
  justify-content: center;
`
export const LoadingText = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #f3f3f3;
`