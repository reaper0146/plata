import io
import sys
import pandas as pd
import subprocess
import json
import requests

test = sys.argv[1] #'QmTn6LTbAv9wHTzDsMtoa8Zr9WdhX9KbfLkrLgBo3EVr9A' #sys.argv[1] #'QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW' #sys.argv[1]
#print(test)
#params = (
#   ('arg', 'QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW'),
#)

#response = requests.get('https://ipfs.infura.io:5001/api/v0/block/get', params=params) #csv
#print(response.text)

#params = (
#   ('arg', 'QmPw9LhhdEqyHYc1aYqW9X8FZVsCzfsR44FKykc2YfLTTs'),
#)
#response = requests.post('https://ipfs.infura.io:5001/api/v0/block/get', params=params)
#print(response.text)

if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO

##data = os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW\"')

#print(data)
#TESTDATA = StringIO(os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW\"'))
#print(TESTDATA)
#df = pd.read_csv(str(os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW")), sep=",")

link = "https://ipfs.infura.io:5001/api/v0/cat?arg="+test #QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW"

#print(link)
#print(type(link))

proc = subprocess.run(["curl",  "-X", "POST",  
                  link],
                   stdout=subprocess.PIPE, encoding='utf-8')

cadastro = proc.stdout
#print(cadastro)
data = io.StringIO(cadastro)
#df = pd.DataFrame([json.loads(cadastro)])
#print(data)
df = pd.read_csv(data, sep=",")
print(df)
#print(type(test))
# Simple Linear Regression

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt

# Importing the dataset
dataset = df #pd.read_csv(data, sep=",")
print(dataset)
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 1/3, random_state = 0)

# Training the Simple Linear Regression model on the Training set
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train)

# Predicting the Test set results
y_pred = regressor.predict(X_test)

# Visualising the Training set results
plt.scatter(X_train, y_train, color = 'red')
plt.plot(X_train, regressor.predict(X_train), color = 'blue')
plt.title('Salary vs Experience (Training set)')
plt.xlabel('Years of Experience')
plt.ylabel('Salary')
plt.show()

# Visualising the Test set results
plt.scatter(X_test, y_test, color = 'red')
plt.plot(X_train, regressor.predict(X_train), color = 'blue')
plt.title('Salary vs Experience (Test set)')
plt.xlabel('Years of Experience')
plt.ylabel('Salary')
plt.show()
print("\nEnd")