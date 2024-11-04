exports.success = (message, data) => {
  return {
    message, // le message client
    data, // les données
    time: new Date(), // la date de la résponse
  };
};
