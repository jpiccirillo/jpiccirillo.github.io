#!/usr/bin/env python3
import os
import unicodedata
import numpy
import time

def main():
    os.system('clear')
    starting_principal = read_valid_int("Enter starting principal: ", 1, 100000000);
    number_months = read_valid_int("Enter number of months for CD: ", 1, 100000000);
    yearly_interest = float(input("Enter yearly APY: "));
    changes_principal = read_valid_int("Will you be making changes to your principal? 1 = YES, 2 = NO: ", 1, 2);
    more = "";
    changed_months = [];
    
    if changes_principal == 1:
        
        while (more=="") or (more == 1):
            month_changed = read_valid_int("\n     Which month will you be changing the principal for: ", 1, number_months)
            principal_change= read_valid_int("     How much principal to depsosit/withdraw: ", 1, 100000000);
            changed_months.append([month_changed, principal_change]);
            
            more = read_valid_int("\nChange more months? 1 = YES, 2 = NO: ", 1, 2);

    monthly_interest = 0;
    running_principal = starting_principal;
    running_monthly_interest = 0;
    print("\n===================================\n   Starting Balance: ",starting_principal,"\n   Running for: ", number_months, " months", sep = "");
    
    if len(changed_months) > 0:
        print("\n   Modified Principal at:")
        for i in range(0, len(changed_months)):
            print("      Month ", changed_months[i][0], ": ", abs(changed_months[i][1]), sep="", end="");
            if (changed_months[i][1] < 0):
                print(" withdrawn", sep = "");
            else: 
                print(" deposited", sep = "");
            
    print("\n===================================",sep="", end="");
    
    for i in range(0,number_months):
        print("\nEnd of Month ",i+1,":",sep="");
        for j in range(0,len(changed_months)):
            if (i == changed_months[j][0]):
                running_principal = running_principal + changed_months[j][1];
                print("   **", changed_months[j][1], sep = "", end = "");
                if changed_months[j][1] < 0:
                    print(" withdrawn from ", sep="", end="");
                else: 
                    print(" added to ", sep="", end="");
                print("the principal**", sep = "");    
        
        monthly_interest = running_principal*(yearly_interest/365/100)*(365/12);
        running_monthly_interest = running_monthly_interest + monthly_interest 
        
        running_principal = running_principal + monthly_interest
        
        print("   Running balance: ", '%.2f'%(running_principal), sep = "");
        print("   Monthly interest: ", '%.2f'%(monthly_interest), sep = "");
        print("   Total interest generated: ", '%.2f'%(running_monthly_interest), sep=""); 
        time.sleep(.01);
        
def read_valid_int(prompt, min, max):
    
    min = int(min)
    max = int(max)

    value = ''    
    while not isinstance(value,int) or (value<min or value>max):
        value = input(prompt)
        try:
            value = int(value)
        except ValueError:
            print("Not an integer.\n") 
            continue
            
        if (value<min) or (value>max):               
            print("Selection is out of range.\n")
            continue
            
        else:
            return value

        
main();
