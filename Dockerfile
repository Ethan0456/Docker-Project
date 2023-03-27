FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04

# Install necessary packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        python3-pip \
        python3-dev \
        libglib2.0-0 \
        libsm6 \
        libxext6 \
        libxrender-dev \
        git && \
    rm -rf /var/lib/apt/lists/*

# Install PyTorch and torchvision
RUN pip3 install torch torchvision -f https://download.pytorch.org/whl/cu102/torch_stable.html

# Set working directory
WORKDIR /app