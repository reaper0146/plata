# Dockerfile used to build the VM image which will be downloaded by providers.
# The file must specify a workdir and at least one volume.

# We're using python slim image in this example to limit the time it takes for the
# resultant image to be first downloaded by providers, given the fact that our example
# here is limited to barebones Python installation.
FROM python:3.8.7-slim

VOLUME /golem/input /golem/output

# For the sake of completeness, we're including `worker.py` as part of the VM image.
#
# During development though, a developer could choose to send `worker.py` to the provider
# as part of the task, to eliminate the need to build and upload the VM image each time.
COPY worker.py /golem/entrypoint/
WORKDIR /golem/entrypoint
