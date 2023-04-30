import csv

# Open the CSV file for reading
with open('yasyasyas_filtered_with_predictions.csv', newline='',encoding='utf-8') as csvfile:
    # Create a CSV reader object
    reader = csv.reader(csvfile)
    # Skip the header row
    next(reader)
    next(reader)

    # Create an empty list to store the data
    data = []
    index = 1  # Initialize index variable
    positive=0
    negative=0
    # Iterate over each row in the CSV file
    for row in reader:
         if (int(row[2]) == 0):
             negative+=1
         else: positive+=1
         data.append({
            'id': index,  # Use index variable as id
        
            'name': row[0],
            'Comment': row[1],
            'Output': int(row[2]),
         })
       
         index += 1  # Increment index variable

# Open the output file for writing
with open('PieData.js', 'w', encoding='utf-8') as outfile:
    # Write the start of the array definition
    outfile.write('export const PieDataTeam = ')
    outfile.write(str(data))
    print (data)
    
print(positive,negative)
