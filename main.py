import json
import docker

# Load configuration from JSON file
with open('input.json', 'r') as f:
    config = json.load(f)

# Create Docker client
client = docker.from_env()

# Build Docker image
image, logs = client.images.build(
    path=config['path'],
    dockerfile=config['dockerfile'],
    # buildargs=config['buildargs'],
    tag=config['tag'],
    rm=True,
)

# Start Docker container
# container = client.containers.run(
#     image=image.tags[0],
#     command=config['command'],
#     detach=True,
#     name=config['name'],
#     ports=config['ports'],
#     environment=config['environment'],
#     volumes=config['volumes']
# )

# # Install packages and libraries
# for package in config['packages']:
#     container.exec_run(f'apt-get install -y {package}')

# for library in config['libraries']:
#     container.exec_run(f'pip install {library}')

# # Stop and remove Docker container
# container.stop()
# container.remove()
