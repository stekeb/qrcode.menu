const User = require("../models/user.model");
const Menuitem = require("../models/menuitem.model");

async function getAll(req, res) {
  try {
    const users = await User.findAll({
      include: [{ model: Menuitem }],
    });
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function createUser(req, res) {
  try {
    const { userName, password, eMail } = req.body;
    const newUser = await User.create({ userName, password, eMail });
    res.status(201);
    res.json(newUser);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function getOne(req, res) {
  try {
    const userName = req.params.userName;
    const password = req.params.password;
    const singleUser = await User.findOne({
      where: {
        userName: userName,
        password: password,
      },
      include: [{ model: Menuitem }],
    });
    res.status(201);
    res.json(singleUser);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const userToBeDeleted = await User.findOne({
      where: {
        id: id,
      },
    });
    await userToBeDeleted.destroy();
    res.status(201);
    res.json(`Userid ${id} has been deleted`);
    console.log(`Userid ${id} has been deleted`);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function createItem(req, res) {
  try {
    const UserId = req.params.id;
    const singleUser = await User.findOne({
      where: {
        id: UserId,
      },
      include: [{ model: Menuitem }],
    });

    const { toBeTranslated, className, en, de, fr, es, it, price, menuNumber } =
      req.body;

    let oldSortNo = 0;
    let sortNo;

    if (singleUser.Menuitems.length === 0) {
      sortNo = 0;
    } else {
      for (let i = 0; i < singleUser.Menuitems.length; i++) {
        if (singleUser.Menuitems[i].sortNo > oldSortNo) {
          oldSortNo = singleUser.Menuitems[i].sortNo;
        }
      }
      sortNo = Number(oldSortNo) + 1;
    }

    const newItem = await Menuitem.create({
      UserId,
      toBeTranslated,
      className,
      en,
      de,
      fr,
      es,
      it,
      price,
      menuNumber,
      sortNo,
    });
    res.status(201);
    res.json(newItem);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function deleteItem(req, res) {
  try {
    const id = req.params.id;
    const itemToBeDeleted = await Menuitem.findOne({
      where: {
        id: id,
      },
    });

    await itemToBeDeleted.destroy();
    res.json(`Item with ${id} has been deleted`);
    res.status(201);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function moveUp(req, res) {
  try {
    const id = req.params.id;
    const itemToBeMovedUp = await Menuitem.findOne({
      where: {
        id: id,
      },
    });
    const userId = itemToBeMovedUp.UserId;
    const sortNo = itemToBeMovedUp.sortNo;

    let n = 1;
    while (
      (await Menuitem.findOne({
        where: {
          UserId: userId,
          sortNo: Number(sortNo) - n,
        },
      })) == undefined
    ) {
      n++;
    }
    const sortNoMoveDown = Number(sortNo) - n;

    const itemToBeMovedDown = await Menuitem.findOne({
      where: {
        UserId: userId,
        sortNo: sortNoMoveDown,
      },
    });

    itemToBeMovedDown.sortNo = sortNo;
    await itemToBeMovedDown.save();

    itemToBeMovedUp.sortNo = sortNoMoveDown;
    await itemToBeMovedUp.save();

    res.status(201);
    res.json(itemToBeMovedUp);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

async function moveDown(req, res) {
  try {
    const id = req.params.id;
    const itemToBeMovedDown = await Menuitem.findOne({
      where: {
        id: id,
      },
    });
    const userId = itemToBeMovedDown.UserId;
    const sortNo = itemToBeMovedDown.sortNo;

    let n = 1;
    while (
      (await Menuitem.findOne({
        where: {
          UserId: userId,
          sortNo: Number(sortNo) + n,
        },
      })) == undefined
    ) {
      n++;
    }
    const sortNoMoveUp = Number(sortNo) + n;

    const itemToBeMovedUp = await Menuitem.findOne({
      where: {
        UserId: userId,
        sortNo: sortNoMoveUp,
      },
    });

    itemToBeMovedUp.sortNo = sortNo;
    await itemToBeMovedUp.save();

    itemToBeMovedDown.sortNo = sortNoMoveUp;
    await itemToBeMovedDown.save();

    res.status(201);
    res.json(itemToBeMovedDown);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}

module.exports = {
  getAll,
  createUser,
  deleteUser,
  createItem,
  getOne,
  moveUp,
  moveDown,
  deleteItem,
};
