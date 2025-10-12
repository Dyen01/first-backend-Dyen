const express = require('express');
const router = express.Router();

// 1. Lấy danh sách người dùng
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'GET: Danh sách người dùng thành công',
    data: [
      { id: 1, username: "Alice", email: "alice@dev.com" },
      { id: 2, username: "Bob", email: "bob@dev.com" }
    ]
  });
});

// 2. Tạo người dùng mới
router.post('/', (req, res) => {
  const newUser = req.body;
  res.status(201).json({
    message: 'POST: Tạo người dùng mới thành công',
    data: newUser
  });
});

// 3. Lấy chi tiết người dùng
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  if (userId === '1') {
    res.status(200).json({
      message: `GET: Chi tiết người dùng ID: ${userId}`,
      data: { id: userId, username: "Alice", email: "alice@dev.com" }
    });
  } else {
    res.status(404).json({
      message: `GET: Không tìm thấy người dùng có ID: ${userId}`
    });
  }
});

// 4. Cập nhật người dùng
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;
  res.status(200).json({
    message: `PUT: Cập nhật người dùng ID ${userId} thành công`,
    updatedData: updateData
  });
});

// 5. Xóa người dùng
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.status(204).send();
});

module.exports = router;