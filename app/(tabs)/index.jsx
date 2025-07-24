import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { View, Text } from 'react-native'

const HomeScreen = () => {
  const { isSignedIn } = useAuth()

    if (!isSignedIn) return <Redirect href={'/(auth)/sign-in'} />
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen