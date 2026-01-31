import pool from '../Servers/database.js';

export const getSettings = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM system_info');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching system settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateSettings = async (req, res) => {
  try {
    const { Name, Address, phone_number, email } = req.body; 
     var logo = req.file ? req.file.path : null;
     if (logo===null){ 
      const existingSettings = await pool.query('SELECT logo FROM system_info WHERE email = $1', [email]);
        logo = existingSettings.rows[0].logo;
        }

  
    const result = await pool.query(
      'UPDATE system_info SET Name = $1, Address = $2, phone_number = $3, email = $4, logo = $5 RETURNING *',
      [Name, Address, phone_number, email, logo]
    );

    console.log(result.rows);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating system settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNotifications = async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM notifications ORDER BY created_at DESC');
      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


export const updateNotificationById = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await pool.query('UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *', [id]);
      res.status(200).json({message: 'Notification marked as read'});
  } catch (error) {
      console.error('Error updating notification:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSpecificNotifications = async (req, res) => {
  const { notTab, searchText = "" } = req.body;
  const search = `%${searchText.trim()}%`;

  try {
    let sql = "";
    let values = [];

    switch (notTab) {
      case "read":
      case "unread":
        sql = `
          SELECT * FROM notifications
          WHERE is_read = $1
          AND (
            message ILIKE $2
            OR type ILIKE $2
            OR status ILIKE $2
          )
        `;
        values = [notTab === "read", search];
        break;

      case "critical":
      case "normal":
        sql = `
          SELECT * FROM notifications
          WHERE status = $1
          AND (
            message ILIKE $2
            OR type ILIKE $2
          )
        `;
        values = [notTab, search];
        break;

      default:
        sql = `
          SELECT * FROM notifications
          WHERE
            message ILIKE $1
            OR type ILIKE $1
            OR status ILIKE $1
        `;
        values = [search];
    }

    const results = await pool.query(sql, values);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
