import React, {forwardRef,useCallback,useImperativeHandle,useState,useEffect} from 'react';
export default forwardRef((props,ref) =>{
    

    const [filterState, setFilterState] = useState('off');

    useImperativeHandle(ref,()=>{
        return {
            isFilterActive(){
                return filterState!='off';
            },
            doesFilterPass(Params){
                const field = props.colDef.field;
                return Params.data[field]==filterState;
                //return Params.data.year==filterState;
            },
            getModel(){
                if(filterState=='off'){
                    return undefined;
                }
                return { state : filterState };
            },
            setModel(model){
                if (model==null){
                    setFilterState('off')
                } else{
                    setFilterState(model.state)
                }
            },
            getModelAsString(){
                return filterState=='off'?'' : filterState;
            }//,
            //onNewRowsLoaded(){
              //  console.log('new row where loaded');
            //},
            //onAnyFilterChanged(){
              //  console.log('another filter was changed');
            //}//,
            //afterGuiAttached(){
              //  console.log('something focus???')
            //}
        }
    });
    


    //useEffect(()=>{
      //  console.log(props.title + 'filter created');
        //return ()=>console.log(props.title + 'filter destroyed')
    //},[]
 //);



    useEffect(()=>props.filterChangedCallback(),
        [filterState]);



{/**
    const onListener = useCallback(
        ()=> setFilterState('on'),[]);

    const offListener = useCallback(
        ()=>setFilterState('off'),[]);
 */}


    
    return (
        <>
            <div className='filter-title'>{props.title}</div>
            <div className='filter-state'> State = {filterState} </div>
            <div className='filter-entry'> <button onClick={()=>setFilterState('off')}>Off</button> </div>


            {
                props.values.map(value => (
                    <div className='filter-entry'>
                        <button key={value} onClick={()=>setFilterState(value)}>
                            {value}
                        </button>
                    </div>
                ))
            }





            {/*
            <div>Year Filter</div>
            <label>
                Filter On
                <input type='radio' name='rbYearFilter' value="offListener" checked={filterState=='off'} onChange={offListener}/>
            </label>
            <label>
                Filter Off
                <input type='radio' name='rbYearFilter' value="onListener" checked={filterState=='on'} onChange={onListener}/>
            </label>
             */}



            {/**
             * 
             *             <label>
                            Filter On
                            <input type='radio' name='rbYearFilter' value="off" checked={filterState=='off'} onChange={()=>setFilterState('off')}/>
                        </label>
                        <label>
                            2004
                            <input type='radio' name='rbYearFilter' value="2004" checked={filterState=='2004'} onChange={()=>setFilterState('2004')}/>
                        </label>
                        <label>
                            2008
                            <input type='radio' name='rbYearFilter' value="2008" checked={filterState=='2008'} onChange={()=>setFilterState('2008')}/>
                        </label>
            */}




        </>
    )
});