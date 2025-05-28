
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    title: string;
    description: string;
    complexity: string;
    downloadCount: string;
  } | null;
}

const TemplatePreview = ({ isOpen, onClose, template }: TemplatePreviewProps) => {
  if (!template) return null;

  const getTemplateContent = (title: string) => {
    switch (title) {
      case "Divorce Petition Template":
        return `
DIVORCE PETITION

Case No: [TO BE FILLED BY COURT]

IN THE MATTER OF:
[Petitioner Name] vs [Respondent Name]

PETITION FOR DISSOLUTION OF MARRIAGE

TO THE HONORABLE COURT:

1. JURISDICTION AND VENUE
   This court has jurisdiction over this matter pursuant to [State Code Section].
   
2. PARTIES
   Petitioner: [Full Name]
   Address: [Complete Address]
   
   Respondent: [Full Name]
   Address: [Complete Address]

3. MARRIAGE INFORMATION
   Date of Marriage: [Date]
   Place of Marriage: [Location]
   
4. GROUNDS FOR DIVORCE
   The marriage is irretrievably broken due to [specify grounds].

5. RELIEF SOUGHT
   Petitioner respectfully requests this Court to:
   a) Grant a dissolution of marriage
   b) Award reasonable spousal support
   c) Equitably distribute marital property
   d) Award custody of minor children (if applicable)

[Additional sections as required by state law]

_________________________
Petitioner Signature

Date: ______________
        `;
      case "Rental Lease Agreement":
        return `
RESIDENTIAL LEASE AGREEMENT

This Lease Agreement is entered into on [Date] between:

LANDLORD: [Landlord Name]
Address: [Landlord Address]

TENANT: [Tenant Name]

PROPERTY ADDRESS: [Rental Property Address]

TERMS:
1. LEASE TERM: [Start Date] to [End Date]

2. RENT: $[Amount] per month, due on the [Day] of each month

3. SECURITY DEPOSIT: $[Amount]

4. UTILITIES: [Specify who pays what]

5. OCCUPANCY: Maximum [Number] persons

6. PETS: [Pet policy]

7. MAINTENANCE: Tenant agrees to maintain the property in good condition

8. TERMINATION: [Notice requirements]

9. GOVERNING LAW: This agreement shall be governed by [State] law

LANDLORD SIGNATURE: _____________________ DATE: _______

TENANT SIGNATURE: ______________________ DATE: _______
        `;
      default:
        return `
[TEMPLATE PREVIEW]

This is a preview of the ${title}.

The actual template would contain:
- Professional legal formatting
- All required sections and clauses
- Customizable fields marked with [brackets]
- Legal compliance elements
- State-specific requirements
- Proper legal terminology

To access the complete template:
1. Click the Download button
2. Fill in the required information
3. Review with legal counsel if needed
4. Use according to your jurisdiction's requirements

Note: This preview shows the general structure. 
The full template includes detailed legal language 
and comprehensive coverage of all relevant topics.
        `;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">{template.title}</DialogTitle>
              <DialogDescription className="mt-2">
                {template.description}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="border rounded-lg p-6 bg-gray-50 max-h-96 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm font-mono">
            {getTemplateContent(template.title)}
          </pre>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close Preview
          </Button>
          <Button className="bg-lawmate text-white hover:bg-lawmate-dark">
            <Download className="h-4 w-4 mr-1" />
            Download Template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreview;
