# ☁️ How to Connect Your MongoDB Atlas Cloud Database

You have created your "ems" cluster. Now follow these exact steps to connect it to Render.

## Step 1: Allow Access (Network Access)
*Render needs permission to talk to your database.*

1.  Log in to your [MongoDB Atlas Dashboard](https://cloud.mongodb.com).
2.  Look at the **Left Sidebar**.
3.  Scroll down to the section named **"Security"**.
4.  Click **Network Access**.
5.  Click the green button **+ ADD IP ADDRESS**.
6.  Click **ALLOW ACCESS FROM ANYWHERE** (or manually type `0.0.0.0/0`).
7.  Click **Confirm**.
    *(Status will show "Pending" for a minute, then "Active". This is normal).*

## Step 2: Create a Database User
*You need a username/password specifically for the database (NOT your login email).*

1.  In the **Left Sidebar** (under Security), click **Database Access**.
2.  Click green button **+ ADD NEW DATABASE USER**.
3.  **Authentication Method:** Password.
4.  **Username:** `admin` (or whatever you like).
5.  **Password:** `password123` (Pick a strong one!).
    *   *Tip: Click "Autogenerate Secure Password" and COPY IT somewhere safe.*
6.  **Database User Privileges:** Select "Read and write to any database".
7.  Click **Add User**.

## Step 3: Get the Connection String
1.  Click **Database** in the left sidebar (to go back to your Cluster view).
2.  On your `ems` cluster card, click the **Connect** button.
3.  Select **Drivers**.
4.  You will see a string like this:
    ```text
    mongodb+srv://admin:<password>@ems.abcde.mongodb.net/?retryWrites=true&w=majority&appName=ems
    ```
5.  **Copy this string**.

## Step 4: Final Setup
1.  Paste the string into a notepad.
2.  Replace `<password>` with the actual password you created in Step 2.
    *   *Example:* If password is `superSecret`, the link becomes `mongodb+srv://admin:superSecret@ems...`
3.  **Go to Render Dashboard** -> Backend Service -> Environment.
4.  Paste this final URL into `MONGO_URI`.
5.  Save.

Your backend will now restart and connect successfully! 🟢
