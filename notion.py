
## notion stuff
# notion_token = os.environ["NOTION_TOKEN"]
# sub_list_url = os.environ["NOTION_SUBS_PAGE"]
# messages_url = os.environ["NOTION_MESSAGES_PAGE"]
# app_list_url = os.environ["NOTION_APPLICATIONS_PAGE"]

# client = NotionClient(token_v2=notion_token)

# collection_view = client.get_collection_view(sub_list_url)
# messages_view = client.get_collection_view(messages_url)
# applications_view = client.get_collection_view(app_list_url)

# def updateNotion(id,email):
#     new_row = collection_view.collection.add_row()
#     new_row.id = str(id)
#     new_row.email = str(email)

# def updateNotionMessages(id, firstname, lastname, email, message):
#     new_row = messages_view.collection.add_row()
#     new_row.id = str(id)
#     new_row.firstname = str(firstname)
#     new_row.lastname = str(lastname)
#     new_row.email = str(email)
#     new_row.message = str(message)

# def updateNotionApplications(id, firstname, lastname, email, profession, message, cv_url):
#     new_row = applications_view.collection.add_row()
#     new_row.id = str(id)
#     new_row.firstname = str(firstname)
#     new_row.lastname = str(lastname)
#     new_row.email = str(email)
#     new_row.profession = str(profession)
#     new_row.message = str(message)
#     new_row.cv = str(cv_url)