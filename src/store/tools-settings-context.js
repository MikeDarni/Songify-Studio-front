import { createContext, useState } from "react";

const ToolsSettingsContext = createContext({
  filter: {
    enable: "false",
    value: 0,
  },
  setFilterSettings: (filterSetting) => {},
});

export function ToolsSettingsProvider(props) {
  const [filterSettings, setFilterSettings] = useState({
    filter: {
      enable: "false",
      value: 0,
    },
  });

  function setCurrentToolsSettings(ToolsSetting) {
    setFilterSettings(ToolsSetting);
  }

  const context = {
    filter: filterSettings,
    setFilterSettings: setCurrentToolsSettings,
  };

  return (
    <ToolsSettingsContext.Provider value={context}>
      {props.children}
    </ToolsSettingsContext.Provider>
  );
}

export default ToolsSettingsContext;
