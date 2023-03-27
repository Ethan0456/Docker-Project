import json
import docker


def writeToDockerFile(dockerfile, str):
    dockerfile.write(str)
    dockerfile.write('\n')
    

def createDockerFile(config):
    with open('Dockerfile', 'w') as dockerfile:
        # Mandatory Lines
        writeToDockerFile(dockerfile,f"FROM {config['os']}")
        writeToDockerFile(dockerfile,f"WORKDIR {config['workdir']}")
        writeToDockerFile(dockerfile,f"RUN apt update")

        # writeToDockerFile(dockerfile,f"EXPOSE {[i for i in config['ports']]}")
        writeToDockerFile(dockerfile,f"")

        # Install Packages
        for package in config['packages']:
            writeToDockerFile(dockerfile,f"RUN apt install -y {package}")

        writeToDockerFile(dockerfile,f"")
        # Install Libraries
        for library in config['libraries']:
            writeToDockerFile(dockerfile,f"RUN pip install {library}")



with open('input.json', 'r') as f:
    config = json.load(f)

# Get Instance
client = docker.from_env()

createDockerFile(config)

# Create New Dockerfile according to User Input
# Generate Image
image, logs = client.images.build(
    path=config['path'],
    dockerfile=config['dockerfile'],
    tag=config['tag'],
    rm=True,
)

#
# container = client.containers.run(
#     image=image.tags[0],
#     command=config['command'],
#     detach=True,
#     name=config['name'],
#     ports=config['ports'],
#     environment=config['environment'],
#     volumes=config['volumes']
# )

# for package in config['packages']:
#     container.exec_run(f'apt-get install -y {package}')

# for library in config['libraries']:
#     container.exec_run(f'pip install {library}')
