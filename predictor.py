
class Predictor:
    def __init__(self, height, weight, age, database):
        self.height = height
        self.weight = weight
        self.age = age
        self.database = database

    def get_values_from_database(self):
        return {}

    def compute_risk_from_data(self, data_dict):
        return 0


