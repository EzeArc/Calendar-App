/* Event Routes 
/api/events */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require("../helpers/isDate");
const {
  actualizarEvento,
  crearEvento,
  eliminarEvento,
  getEventos,
} = require("../controllers/events");

const router = Router();

//Todas tienen q pasar por la validación del JWT
//En caso de rutas publicas subirlas antes de la linea del router.use(validarJWT)
router.use(validarJWT);

//obtener eventos
router.get("/", getEventos);

//Crear eventos
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha inicio es obligatorio").custom(isDate),
    check("end", "Fecha finalizacion es es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//Actualiazr eventos
router.put("/:id", actualizarEvento);

//Eliminar eventos
router.delete("/:id", eliminarEvento);

module.exports = router;
