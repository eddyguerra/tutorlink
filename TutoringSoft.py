import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

tutors = {}
students = {}

class User:
    def __init__(self, first_name, last_name, user_type, username, password, email):
        self.first_name = first_name
        self.last_name = last_name
        self.user_type = user_type
        self.username = username
        self.password = password
        self.email = email

# Function to send a confirmation email
def send_confirmation_email(user_email, first_name):
    sender_email = "sadmansakib872@gmail.com"
    sender_password = "zafp fuwg eflk asqu"  # Ensure this is securely handled

    subject = "Registration Confirmation"
    body = f"Hello {first_name},\n\nThank you for registering. Your account has been successfully created!"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = user_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, user_email, msg.as_string())
        server.close()
        print(f"Confirmation email sent to {user_email}")
    except Exception as e:
        print(f"Failed to send email: {str(e)}")

def register_user():
    print("\n---- Register New User ----")
    first_name = input("First Name: ")
    last_name = input("Last Name: ")
    user_type = input("User Type (student/tutor): ").strip().lower()
    username = input("Username: ")
    password = input("Password: ")
    email = input("Email: ")

    if not first_name or not last_name or not username or not password or not email:
        print("Error: All fields are required.")
        return

    if user_type == "student":
        user_list = students
    elif user_type == "tutor":
        user_list = tutors
    else:
        print("Error: Invalid user type.")
        return

    if username in [user.username for user in user_list.values()]:
        print("Error: Username already exists.")
        return

    user_list[username] = User(first_name, last_name, user_type, username, password, email)

    # Send confirmation email
    send_confirmation_email(email, first_name)

    print(f"User {first_name} {last_name} registered successfully!\n")
    show_main_screen()

def login_user():
    print("\n---- Login ----")
    username = input("Username: ")
    password = input("Password: ")

    user = tutors.get(username) or students.get(username)
    if user and user.password == password:
        print(f"Welcome, {user.first_name}!")
        show_dashboard(user.first_name)
    else:
        print("Error: Invalid username or password.")
        show_main_screen()

# Function to display user dashboard after login
def show_dashboard(first_name):
    print(f"\nHello, {first_name}! Welcome to your dashboard.")
    logout_choice = input("Do you want to logout? (yes/no): ").strip().lower()
    if logout_choice == "yes":
        print("You have been logged out.")
        show_main_screen()

def show_main_screen():
    print("\n---- Main Menu ----")
    print("1. Login")
    print("2. Register")
    choice = input("Select an option (1/2): ").strip()

    if choice == "1":
        login_user()
    elif choice == "2":
        register_user()
    else:
        print("Invalid option. Please select 1 or 2.")
        show_main_screen()

def main():
    show_main_screen()

if __name__ == "__main__":
    main()
