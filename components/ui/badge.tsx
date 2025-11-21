import React from "react";
import { Text, View, ViewProps } from "react-native";

type BadgeProps = ViewProps & {
  variant?: "default" | "secondary" | "destructive" | "outline";
  children: React.ReactNode;
  icon?: React.ReactNode; 
};

export function Badge({ variant = "default", children, icon, className, ...props }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default: "bg-green-600 border-transparent",
    secondary: "bg-gray-200 border-transparent",
    destructive: "bg-red-600 border-transparent",
    outline: "border border-gray-400 bg-transparent",
  };

  const textStyles: Record<string, string> = {
    default: 'text-white',
    secondary: 'text-gray-800',
    destructive: 'text-white',
    outline: 'text-gray-800',
  };

  return (
    <View
      {...props}
      className={`flex flex-row items-center justify-center px-2 py-1 rounded-md ${variantStyles[variant]} ${className || ""}`}
    >
      {icon && <View className="mr-2 items-center justify-center">{icon}</View>}
      <Text className={`text-xs font-medium ${textStyles[variant]}`}>{children}</Text>
    </View>
  );
}
