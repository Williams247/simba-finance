export default ({ $axios, $toast, store, $isJson }, inject) => {
  $axios.onRequest(function (data) {});

  $axios.onResponse(function (data) {});

  $axios.onError(function (error) {

    if (error.response === undefined) {
      $toast.error("Network Error: Please refresh and try again.");
      throw error;
    }

    const res = error.response;
    if (res.status === 401) {
      $toast.error(res.data.error);
      throw error;
    }

    if (res.status === 403) {
      $toast.error(res.data.error);
      throw error;
    }

    if (res.status === 404) {
      if (res.data.error) {
        $toast.error(res.data.error);
        throw error;
      }
      $toast.error("Resource does not exist on server");
      throw error;
    }

    const data = res.data
    if (!data) {
      $toast.error(res.messageerror)
      throw error
    }

    if ($isJson(data)) {
      if (error.response.data.error.toLowerCase() === "unauthorized") throw error;
      const messages = data.error.split(", ").map((m) => m.trim());
      for (const msg of messages) $toast.error(msg);
    } else $toast.error("an error occurred");

    throw error;
  });
};
