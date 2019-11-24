from .components.componentmanager import ComponentManager

class ProcessTree:
    def __init__(self):
        self.componentManager = ComponentManager()

    def process(self, tree):
        print('Processing')
        for child in tree.child:
            print(child.data['name'])
            self.componentManager.addComponent(child.data)
            self.process(child)