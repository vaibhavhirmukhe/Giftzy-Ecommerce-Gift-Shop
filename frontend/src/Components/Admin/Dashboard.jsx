import React, { useEffect } from 'react'
import "./Dashboard.css"
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { getAdminProduct } from '../../actions/productAction';
import { clearErrors, getAllOrders } from '../../actions/orderAction';
import {toast} from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { getAllUsers } from '../../actions/userAction';

const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { error, orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

//   let outOfStock = 0;

//   products &&
//     products.forEach((item) => {
//       if (item.Stock === 0) {
//         outOfStock += 1;
//       }
//     });

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
          }
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch, error]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 250, flex: 1 },
    
        {
          field: "status",
          headerName: "Order Status",
          minWidth: 150,
          flex: 0.5,
        },
    
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 100,
          flex: 0.5,
        },
    
      ];
    
      const rows = [];
    
      orders &&
        orders.forEach((item) => {
          rows.push({
            id: item._id,
            amount: item.totalPrice,
            status: item.orderStatus,
          });
        });
  


    const columns2 = [
      {
        field: "avatar",
        headerName: "Avatar",
        minWidth: 60,
        flex: 0.3,
        renderCell: (params) => <img style={{height:"40px", width:"40px"}} src={params.value} alt='avatar_img'/>
      },

      { field: "id", headerName: "User Id", minWidth: 200, flex: 1},
      
      {
        field: "name",
        headerName: "Name",
        minWidth: 120,
        flex: 0.5,
      },

  
    ];
  
    const rows2 = [];
  
    users &&
      users.forEach((item) => {
        rows2.push({
          id: item._id,
          avatar: item.avatar.url,
          name: item.name,
        });
      });

  return (
    <div className="dashboard">
      <Sidebar/>

      <div className="dashboardContainer">
            <h1 style={{padding:"20px", borderBottom:"1px solid rgba(0, 0, 0, 0.205)"}}>Dashboard</h1>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <div>
                <span>{products && products.length}</span>
                <p>Products</p>
              </div>
              <ListAltIcon style={{fontSize:"3rem", color:"rgb(31, 31, 31)"}}/>
            </Link>
            <Link to="/admin/orders">
                <div>
                <span>{orders && orders.length}</span>
                <p>Orders</p>
              </div>
              <ShoppingBagOutlinedIcon style={{fontSize:"3rem", color:"rgb(31, 31, 31)"}}/>
            </Link>
            <Link to="/admin/users">
              <div>
                <span>{users && users.length}</span>
                <p>Users</p>
              </div>
              <GroupsOutlinedIcon style={{fontSize:"3rem", color:"rgb(31, 31, 31)"}}/>
            </Link>
            <Link to=""> 
              <div>
                <span>₹ {totalAmount}</span>
                <p>Total Amount</p>
              </div>
              <AccountBalanceWalletOutlinedIcon style={{fontSize:"2.5rem"}}/>
            </Link>
          </div>
        </div>
        <div className='dashboardSummary2'>
            <div className='dashboardSummary2Box1'>
                <div className="dashboardSummary2Box1Heading">
                    <h3 style={{padding:"5px 0px 10px 0px"}}>Resent Orders</h3>
                    <Link to="/admin/orders">See All <ArrowRightAltOutlinedIcon/></Link>
                </div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                />
            </div>
            <div className='dashboardSummary2Box2'>
                <div className="dashboardSummary2Box1Heading">
                    <h3 style={{padding:"5px 0px 10px 0px"}}>Resent Users</h3>
                    <Link to="/admin/users">See All <ArrowRightAltOutlinedIcon/></Link>
                </div>
                <DataGrid
                    rows={rows2}
                    columns={columns2}
                    pageSize={10}
                    disableSelectionOnClick
                    className="productListTable"
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard