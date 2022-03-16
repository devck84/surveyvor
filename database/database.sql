CREATE DATABASE Surveyvor;

CREATE TABLE [User](
    user_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    email nvarchar(320) NOT NULL UNIQUE,
    first_name nvarchar (255) NOT NULL,
    family_name nvarchar (255) NOT NULL,
    password nvarchar(max) NOT NULL,
    avatar nvarchar (max),
    telephone int,
    country_code nvarchar(3) NOT NULL
);

CREATE TABLE Team(
    team_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    user_id int NOT NULL,
    team_name nvarchar (255) NOT NULL,
    team_description nvarchar(max),
    team_url_invitation nvarchar(max) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES [User](user_id)
);

CREATE TABLE TeamMember(
    team_member_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    user_id int NOT NULL,
    team_id int NOT NULL,
    date_registered date NOT NULL,
    FOREIGN KEY (user_id) REFERENCES [User](user_id),
    FOREIGN KEY (team_id) REFERENCES Team(team_id)
);

CREATE TABLE Privacy(
    privacy_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    privacy_name nvarchar(50) NOT NULL,
    privacy_description nvarchar(max)
);

CREATE TABLE Survey(
    survey_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    team_id int NOT NULL,
    privacy_id int NOT NULL,
    user_id int NOT NULL,
    survey_name nvarchar(220) NOT NULL,
    survey_description nvarchar(max),
    button_color nvarchar(7),
    background_color nvarchar(7),
    date_created date NOT NULL,
    active smallint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES [User](user_id),
    FOREIGN KEY (team_id) REFERENCES Team(team_id),
    FOREIGN KEY (privacy_id) REFERENCES Privacy(privacy_id)
);

CREATE TABLE QuestionType(
    question_type_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    question_type_text nvarchar (220) NOT NULL,
    question_type_description nvarchar(max)
);

CREATE TABLE Question(
    question_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    survey_id int NOT NULL,
    next_question_id int NOT NULL,
    question_text nvarchar (max) NOT NULL,
    question_type_id int NOT NULL,
    required smallint NOT NULL,
    sequence_number int NOT NULL,
    FOREIGN KEY (survey_id) REFERENCES Survey(survey_id)
);

CREATE TABLE DefinedAnswer(
    defined_answer_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    question_id int NOT NULL,
    defined_answer_text nvarchar (220) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(question_id)
);


CREATE TABLE NextQuestion(
    next_question_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    defined_answer_id int NOT NULL,
    question_id int NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (defined_answer_id) REFERENCES DefinedAnswer(defined_answer_id)
);

ALTER TABLE Question
ADD FOREIGN KEY (next_question_id) REFERENCES NextQuestion(next_question_id);

CREATE TABLE UserAnswer(
    user_answer_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    survey_id int NOT NULL,
    question_id int NOT NULL,
    defined_answer_id int,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES [User](user_id),
    FOREIGN KEY (question_id) REFERENCES Question(question_id),
    FOREIGN KEY (survey_id) REFERENCES Survey(survey_id),
    FOREIGN KEY (defined_answer_id) REFERENCES DefinedAnswer(defined_answer_id)
);

CREATE TABLE Invitation(
    invitation_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    sender_id int NOT NULL,
    receiver_id int NOT NULL,
    date_sent datetime NOT NULL
);

CREATE TABLE UserFriend(
    user_friend_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    email_user_from int NOT NULL,
    email_user_to int NOT NULL,
    date_related date NOT NULL
);

CREATE TABLE Chat(
    chat_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    email_user_from int NOT NULL,
    email_user_to int NOT NULL,
    active smallint NOT NULL
);

CREATE TABLE Message(
    message_id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    sender_id int NOT NULL,
    receiver_id int NOT NULL,
    chat_id int NOT NULL,
    date_sent datetime NOT NULL,
    message_seen smallint NOT NULL,
    message_text nvarchar (max) NOT NULL,
    FOREIGN KEY (chat_id) REFERENCES Chat(chat_id)
);
