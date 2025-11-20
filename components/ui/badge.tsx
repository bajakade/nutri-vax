import React from "react";
import { Text, View, ViewProps } from "react-native";

type BadgeProps = ViewProps & {
  variant?: "default" | "secondary" | "destructive" | "outline";
  children: React.ReactNode;
  icon?: React.ReactNode; 
};

export function Badge({ variant = "default", children, icon, className, ...props }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default: "bg-green-600 text-white border-transparent",
    secondary: "bg-gray-200 text-gray-800 border-transparent",
    destructive: "bg-red-600 text-white border-transparent",
    outline: "border border-gray-400 text-gray-800 bg-transparent",
  };

  return (
    <View
      {...props}
      className={`flex flex-row items-center justify-center px-2 py-1 rounded-md ${variantStyles[variant]} ${className || ""}`}
    >
      {icon && <View className="mr-1">{icon}</View>}
      <Text className="text-xs font-medium">{children}</Text>
    </View>
  );
}
