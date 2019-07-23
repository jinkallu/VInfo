sudo docker build -t python_gcc .
sudo docker tag a743eaee51c2 jinkallu/python_gcc:latest
sudo docker login -u jinkallu -p L4ZPxFuaBZcBdX9
sudo docker push jinkallu/python_gcc
