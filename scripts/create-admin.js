const { Admin, initializeDatabase } = require("../lib/sequelize");  
const bcrypt = require("bcryptjs");  
  
async function createAdmin() {  
  try {  
    await initializeDatabase();  
    const existingAdmin = await Admin.findOne({ where: { username: "admin" } });  
    if (existingAdmin) { console.log("Admin already exists!"); return; }  
    const hashedPassword = await bcrypt.hash("admin123", 10);  
    const admin = await Admin.create({ username: "admin", password: hashedPassword, nama: "Administrator", email: "admin@bpbd.bogor.go.id", is_active: true });  
    console.log("Admin created successfully!");  
  } catch (error) { console.error("Error:", error); }  
  process.exit(0);  
}  
createAdmin(); 
