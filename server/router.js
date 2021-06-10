const router = require ('express').Router();
const { getAll, createUser, deleteUser, createItem, getOne, moveUp, moveDown, deleteItem } = require ('./controllers/controller')

router.get('', getAll)
router.post('', createUser);
router.delete('/:id', deleteUser)
router.get('/:id', getOne)
router.post('/item/:id', createItem)
router.put('/item/up/:id', moveUp)
router.put('/item/down/:id', moveDown)
router.delete('/item/delete/:id', deleteItem)




module.exports = router;