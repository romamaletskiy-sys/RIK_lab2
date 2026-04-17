const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('surveyAPI', {
  submitSurvey: (data) => ipcRenderer.invoke('submit-survey', data)
});
