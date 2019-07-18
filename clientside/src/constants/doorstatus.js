export const CLOSE=0
export const OPEN=1
export const MOVE=2
export function getStatusFromNumber ( n ){
    switch(n){
        case 0:
            return 'CLOSE'            
        case 1:
            return 'OPEN'            
        case 2:
            return 'MOVE'            
        default:
            return 'INVALID STATUS'
    }
}

