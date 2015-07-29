App.info({
  name: 'Gankei',
  description: 'A league of legends tool',
  version: '0.0.1'
});

App.setPreference('StatusBarStyle', 'false');
App.setPreference('StatusBarBackgroundColor', '#2C53AE');
App.setPreference('StatusBarOverlaysWebView', 'true');

App.accessRule("http://ddragon.leagueoflegends.com");