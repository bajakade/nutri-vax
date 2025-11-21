 // app/(tabs)/coming-soon.tsx   or any other route
 import React from 'react';
 import { View, Text } from 'react-native';
 
 const Refer = () => {
   return (
     <View className="flex-1 bg-background justify-center items-center px-8">
       <View className="items-center">
        
 
         <Text className="text-4xl font-bold text-foreground text-center mb-4">
           Coming Soon
         </Text>
 
         <Text className="text-lg text-muted-foreground text-center leading-7">
           This feature is under development{'\n'}and will be available very soon.
         </Text>
 
         <Text className="text-sm text-muted-foreground/70 text-center mt-8">
           Stay tuned!
         </Text>
       </View>
     </View>
   );
 }
 
 export default Refer;