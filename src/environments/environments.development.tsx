export const environment = {
    region: 'eu-west-3',
    apiKey: 'rcqMKUXgRK3aUyTGGSM8p9S06N3cXWu178N4Xp6R',
    cognito: {
        userPool: 'eu-west-3_4dQCswMaW',
        clientId: '2k261a37ptr2cs555vquf2utbl',
        identityPool: 'eu-west-3:a6770e4c-ba0b-49d4-8dbd-ad0872f1724a',
        appDomain: 'fixenova-sandbox.auth.eu-west-3.amazoncognito.com',
        responseType: 'code'
    },
    api:{
        msSharedServices: {
            getServices: "https://l9igl2khu4.execute-api.eu-west-3.amazonaws.com/dev/api/data/service",
            updateService: "https://l9igl2khu4.execute-api.eu-west-3.amazonaws.com/dev/api/data/service/"
        }
    }
}