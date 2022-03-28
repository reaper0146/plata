import io
import pandas as pd
from Crypto.Cipher import AES

#open text file in read mode
text_file = open("Output.txt", "r")
 
#read whole file to a string
datatest = text_file.read()
 
#close file
text_file.close()
print(datatest)

data = io.StringIO(datatest)

df = pd.read_csv(data, sep=",")

# Simple Linear Regression

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt

# Importing the dataset
dataset = df #pd.read_csv(data, sep=",")
#print(dataset)
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