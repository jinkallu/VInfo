from .array import Array

class ComponentManager:
    def __init__(self):
        self.components = []

    def addComponent(self, block):
        method_name = 'add' + block['name']
        # Get the method from 'self'. Default to a lambda.
        method = getattr(self, method_name)
        # Call the method as we return it
        return method(block)

    def addArray(self, block):
        self.components.append(Array(block['id'], block['inputs'], block['outputs']))
        print ("Array component added")

    def addFormula(self, block):
        print ("Formula component added")

    def addGraph(self, block):
        print ("Graph component added")
