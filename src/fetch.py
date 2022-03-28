import io
import sys
import pandas as pd
import subprocess
import json

import requests

test = sys.argv[1]
print(test)
params = (
   ('arg', 'QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW'),
)

response = requests.get('https://ipfs.infura.io:5001/api/v0/block/get', params=params) #csv
print(response.text)

params = (
   ('arg', 'QmPw9LhhdEqyHYc1aYqW9X8FZVsCzfsR44FKykc2YfLTTs'),
)
response = requests.post('https://ipfs.infura.io:5001/api/v0/block/get', params=params)
print(response.text)

if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO

##data = os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW\"')

#print(data)
#TESTDATA = StringIO(os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW\"'))
#print(TESTDATA)
#df = pd.read_csv(str(os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW")), sep=",")

proc = subprocess.run(["curl",  "-X", "POST",  
                  "https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW"],
                   stdout=subprocess.PIPE, encoding='utf-8')

cadastro = proc.stdout
print(cadastro)
data = io.StringIO(cadastro)
#df = pd.DataFrame([json.loads(cadastro)])
print(data)
df = pd.read_csv(data, sep=",")
print(df)