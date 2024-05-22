import time

# Note: I actually realized some ways to make this function more optimized
# For the previous assessment, the algo will output 100 no matter way the
# user input is because the problem statement didn't ask for the min number
# of attempts. But now, I can terminate the loops early if certain conditions
# are met.
def crack_safe(actual_combination):
    def check_digits(tried_combination):
        """Helper function to use the sound amplifying tool."""
        return sum(1 for a, b in zip(tried_combination, actual_combination) if a == b)
    
    start_time = time.time()
    
    current_combination = ['0'] * 10
    attempts = 0

    for i in range(10):
        max_correct_digits = check_digits(''.join(current_combination))
        if max_correct_digits == 10: break # this is when key is all zeros
        
        best_digit = '0'
        
        for digit in '0123456789':
            current_combination[i] = digit
            attempts += 1
            
            correct_digits = check_digits(''.join(current_combination))
            
            if correct_digits > max_correct_digits:
                max_correct_digits = correct_digits
                best_digit = digit
                break
        
        current_combination[i] = best_digit

    end_time = time.time()
    total_time = float(end_time - start_time) # int will always be 0

    return attempts, total_time




















# crack_safe('1800662666')
