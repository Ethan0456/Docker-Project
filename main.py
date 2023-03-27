import json
import docker

with open('input.json', 'r') as f:
    config = json.load(f)

client = docker.from_env()

with open('Dockerfile','w') as dfile:
    dfile.write(f"FROM {config['os']}\n")
    dfile.write(f"WORKDIR /app\n")
    dfile.write(f'RUN apt update && apt install -y python3 python3-pip\n')
    for program in config['libraries']:
        dfile.write(f"RUN pip install {program}")
        dfile.write(f'\n')

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