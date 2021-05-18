module.exports = (req, res, next) => {
    return res.status(404).json({code: 404, message: "Dirección no encontrada."});
}