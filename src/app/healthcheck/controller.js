const healthcheck = (req, res) => res.status(200).send({ live: true });

export default healthcheck;
