const Router = require('express');
const getUserByRequest = require('../../main/user/getUserByToken');
const me = require('../../main/user/me');
const { exec } = require("child_process");
const router = new Router();

router.get('/', async (req, res) => {
    if(process.env.ADMIN_DISCORD_ID === undefined) return
    if(process.env.BACKEND_SERVICE_NAME === undefined) return

    const user = await getUserByRequest(req)
    if(me(user).discord_id === process.env.ADMIN_DISCORD_ID) {
        
        exec(`sudo systemctl restart ${process.env.BACKEND_SERVICE_NAME}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        return res.json({restart: true})
    }
    return res.json({restart: false})
})

module.exports = router;