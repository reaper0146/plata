import io
import sys
import pandas as pd

import subprocess
import json


if sys.version_info[0] < 3: 
    from StringIO import StringIO
else:
    from io import StringIO



##data = os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW\"')

#print(data)
#TESTDATA = StringIO(os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW\"'))
#print(TESTDATA)
#df = pd.read_csv(str(os.system('curl -X POST \"https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW")), sep=",")

proc = subprocess.run(["curl",  "-X", "GET",  
                  "https://ipfs.infura.io:5001/api/v0/cat?arg=QmNM6EjpTvf236cZUzCwQxv1xbiBYjHsTKJP7xKhvwU8YW"],
                   stdout=subprocess.PIPE, encoding='utf-8')

cadastro = proc.stdout
print(type(cadastro))
data = io.StringIO(cadastro)
#df = pd.DataFrame([json.loads(cadastro)])
print(data)
df = pd.read_csv(data, sep=",")
print(df)