const developer = {
    SERVICE_ID: "service_ygytaqu",
    TEMPLATE_ID: "template_pz57a7g",
    EMAIL_PUBLIC_KEY: "sAP62aND2a3u2tu4p"
}

const production = {

}

const test = {
   

}

const configs = {
    DEV: developer,
    PRO: production,
    TEST: test
}

const getConfigObject = (env: string) => {
    return configs[env.toUpperCase()];
}

export default getConfigObject