import express from 'express'
import db from '../db';
var router = express.Router();

router.get('/:userid', async (req, res, next) => {
  const { userid } = req.params
  const user = await db.user.findUnique({
    where: {
      id: userid
    },
    select: {
      id: true,
      email: true,
      name: true,
      Project: true
    }
  })

  if (user) {
    res.json(user);
  } else {
    res.status(404)
  }
  
});

router.post("/:userid", async (req, res) => {
  
  res.status(200)

})

export default router
