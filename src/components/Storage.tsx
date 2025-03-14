import { useEffect, useState } from "@lynx-js/react";
import { useNavigate } from "react-router";


export default function Storage() {
  const nav = useNavigate()

  const [storedValue, setStoredValue] = useState<string | null>(null);

  const setStorage = (e: string) => {
    NativeModules.NativeLocalStorageModule.setStorageItem("testKey", e);
    getStorage();
  };

  const getStorage = () => {
    const value = NativeModules.NativeLocalStorageModule.getStorageItem("testKey");
    setStoredValue(value);
  };

  const clearStorage = () => {
    NativeModules.NativeLocalStorageModule.clearStorage();
    setStoredValue(null);
  };

  useEffect(() => {
    getStorage();
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const contentBoxStyle = {
    border: "1px solid #ccc",
    padding: "2px",
    marginBottom: "20px",
    borderRadius: "5px",
    width: "300px",
    textAlign: "center",
  };

  const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "max-content",
  };

  const buttonStyle = {
    padding: "2px",
    margin: "5px",
    backgroundColor: "#ec644c",
    borderRadius: "5px",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    flexShrink: "0",
  };

  const inputStyle = {
    padding: "2px",
    margin: "5px",
    backgroundColor: "white",
    borderRadius: "5px",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    flexShrink: "0",
    height: "50px",
  };

  const textStyle = {
    fontSize: "18px",
    margin: "10px 0",
    color: "#333",
  };


  const buttonTextStyle = {
    fontSize: "18px",
    margin: "10px 0",
    color: "#fffffe",
    alignSelf: "center",
  };

  return (
    <view style={containerStyle}>
      <view style={contentBoxStyle}>
        <text style={textStyle}>
          Current stored value: {storedValue || "None"}
        </text>
      </view>

      <view style={buttonContainerStyle}>
        <input style={inputStyle} bindinput={(e: ReactLynx.XInputEvent) => setStorage(e.detail.value)} value={storedValue} />
        <view style={buttonStyle} bindtap={() => setStorage('Hello, ReactLynx!')}>
          <text style={buttonTextStyle}>Set storage: Hello, ReactLynx!</text>
        </view>
        <view style={buttonStyle} bindtap={clearStorage}>
          <text style={buttonTextStyle}>Clear storage</text>
        </view>
      </view>
      <text bindtap={() => nav('/')}>
        go back
      </text>
    </view>

  );

}
