export default ({ app }, inject) => {
  const isJson = (data) => {
    try {
      return JSON.stringify(data);
    } catch (e) {
      window.console.log(e);
      return false;
    }
  };
  inject("isJson", isJson);
};
