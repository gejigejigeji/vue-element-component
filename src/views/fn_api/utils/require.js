export  function getApi(path) {
    return require(`@/api/${path}`);
}