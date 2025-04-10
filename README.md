## How to Install and Run SHIELD Society Application

### Prerequisites
Make sure you have the following applications installed on your system:
1. XAMPP (for Apache and MySQL)
2. Visual Studio Code (for development purposes)

### Step 1: Set Up the Database
1. Start XAMPP Services:
   - Open XAMPP.
   - Click the Start button for both Apache and MySQL.
   - Click the Admin button for MySQL to open phpMyAdmin in your browser.

2. Import the Database:
   - In phpMyAdmin, click the Import button in the top menu.
   - Select the `shieldsociety-database.sql` file from your downloaded files.
   - Click Go to complete the import process.

### Step 2: Run the Application
#### Option A: Run the Production Version
1. Open the Project in Visual Studio Code and Run the Backend:
   - Launch Visual Studio Code.
   - From the top menu, click File > Open Folder...
   - Navigate to the folder named `shield` in your downloaded files and open it.
   - Open a new terminal in Visual Studio Code. Located at the top menu.
   - Navigate to the backend directory by typing: cd src\renderer\src\backend
   - Start the backend server with: npm run start
2. Locate the file `shield-1.0.0-setup.exe` in your downloaded files.
3. Double-click the file to install and run the application.

Your application should now be running and connected to the database.

#### Option B: Run the Development Version
1. Open the Project in Visual Studio Code:
   - Launch Visual Studio Code.
   - From the top menu, click File > Open Folder...
   - Navigate to the folder named `shield` in your downloaded files and open it.

2. Run the Frontend:
   - Click Terminal in the top menu, then select New Terminal.
   - In the terminal, navigate to the project folder by typing: cd shield
   - Start the development server by running: npm run dev

3. Run the Backend:
   - Open a new terminal in Visual Studio Code.
   - Navigate to the backend directory by typing: cd src\renderer\src\backend
   - Start the backend server with: npm run start

Your application should now be running and connected to the database.