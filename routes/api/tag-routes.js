const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as: 'taggedProduct'}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tagIdData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'taggedProduct'}]
    });

    if (!tagIdData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagIdData);
  } catch (err) {
    res.status(400).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const createTagData = await Tag.create(req.body);
    res.status(200).json(createTagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update({
        tag_name: req.body.tag_name,
    }, {
        where: {
            id: req.params.id
        },
    });

    res.status(200).json(updateTag);
} catch (err) {
    res.status(500).json(err);
}
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteTagData) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(deleteTagData);
  } catch (err) {
    res.status(400).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
